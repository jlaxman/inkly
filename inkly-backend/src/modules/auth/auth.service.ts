import { Injectable, UnauthorizedException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma.service';
import { EmailService } from '../../common/services/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => EmailService))
    private emailService?: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    // Send welcome email (async, don't wait)
    if (this.emailService) {
      this.emailService.sendWelcomeEmail(user.email, user.name || user.email).catch(() => {
        // Silently fail if email fails
      });
    }

    return {
      user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user has password (Google OAuth users might not have one)
    if (!user.password) {
      throw new UnauthorizedException('Please sign in with Google');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '7d',
    });
  }

  async googleAuth(googleAuthDto: GoogleAuthDto) {
    // In a real implementation, you would verify the Google ID token here
    // For now, we'll accept the token and extract user info
    // Frontend should send: { idToken, email, name, googleId, picture }
    const { idToken } = googleAuthDto;
    
    // Decode the token (in production, verify with Google's API)
    // For MVP, we'll accept user info directly from frontend
    // This is a simplified version - in production, verify the token server-side
    
    // For now, we'll handle this via a separate endpoint that accepts user info
    // See googleAuthWithInfo method below
    throw new UnauthorizedException('Use /auth/google/info endpoint with user details');
  }

  async googleAuthWithInfo(googleId: string, email: string, name: string, picture?: string) {
    // Check if user exists by email or googleId
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { googleId },
        ],
      },
    });

    if (user) {
      // Update googleId if not set
      if (!user.googleId && googleId) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { googleId },
        });
      }
    } else {
      // Create new user
      user = await this.prisma.user.create({
        data: {
          email,
          googleId,
          name: name || email.split('@')[0],
          password: null, // No password for Google users
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      // Send welcome email
      if (this.emailService) {
        this.emailService.sendWelcomeEmail(user.email, user.name || user.email).catch(() => {
          // Silently fail if email fails
        });
      }
    }

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
}

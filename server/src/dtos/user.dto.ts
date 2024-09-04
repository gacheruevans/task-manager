export interface UserDto {
    username: string;
    email: string;
    password: string;
    refreshToken: string;
};

export interface LoginUserDto {
    email: string;
    password: string;
    refreshToken: string;
};
package com.cineverse.auth.controller;

import com.cineverse.auth.dto.*;
import com.cineverse.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody RegisterRequest request) {
        ApiResponse<String> response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        ApiResponse<AuthResponse> response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        ApiResponse<String> response = authService.forgotPassword(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        ApiResponse<String> response = authService.resetPassword(token, newPassword);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(@RequestHeader("X-User-Email") String email) {
        return ResponseEntity.ok(authService.getCurrentUser(email));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        // JWT is stateless, logout handled on client side
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }
}

package com.Ascendia.server.service.Administrator;

import com.Ascendia.server.entity.Administrator.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtils {

    private final SecretKey Key;

    private static final long EXPIRATION_TIME = 43200000; // 12 Hours in milliseconds

    public JWTUtils(){
        String secretString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = secretString.getBytes(StandardCharsets.UTF_8);
        this.Key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user, List<Long> projectIds) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userID", user.getUserID());
        claims.put("designation", user.getDesignation());
        claims.put("projectIDs", projectIds);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String generateRefreshToken(HashMap<String, Object> claims, User user, List<Long> projectIds) {
        claims.put("userID", user.getUserID());
        claims.put("designation", user.getDesignation());
        claims.put("projectIDs", projectIds);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    public Long extractUserID(String token){
        return extractClaims(token, claims -> claims.get("userID", Long.class));
    }

    public String extractDesignation(String token) {
        return extractClaims(token, claims -> claims.get("designation", String.class));
    }

    public List<Long> extractProjectIDs(String token) {
        return extractClaims(token, claims -> claims.get("projectIDs", List.class));
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}

package com.Ascendia.server.config;

import com.Ascendia.server.service.Administrator.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/auth/**", "/public/**", "/progress/**" ,"/reviews/**" ,"/uploads/**").permitAll() // Allow unauthenticated access to static resources
                        .requestMatchers("/admin/**").hasAnyAuthority("Administrator")
                        .requestMatchers("/client/**").hasAnyAuthority("Client", "Consultant")
                        .requestMatchers("/projects/**").hasAnyAuthority("Project Creation Team", "Project Manager", "Site Engineer", "Supervisor", "Technical Officer", "Store Keeper", "Quantity Surveyor")
                        .requestMatchers("/project/**").hasAnyAuthority("Project Creation Team")
                        .requestMatchers("/pmanager/**").hasAnyAuthority("Project Manager", "Project Creation Team")
                        .requestMatchers("/pmanageronly/**").hasAnyAuthority("Project Manager")
                        .requestMatchers("/sengineer/**").hasAnyAuthority("Site Engineer", "Project Manager", "Project Creation Team")
                        .requestMatchers("/sengineeronly/**").hasAnyAuthority("Site Engineer")
                        .requestMatchers("/supervisor/**").hasAnyAuthority("Site Engineer", "Supervisor", "Technical Officer", "Project Manager", "Project Creation Team")
                        .requestMatchers("/supervisoronly/**").hasAnyAuthority("Supervisor", "Technical Officer")
                        .requestMatchers("/store/**").hasAnyAuthority("Store Keeper", "Quantity Surveyor", "Site Engineer", "Project Manager", "Project Creation Team")
                        .requestMatchers("/skeeper/**").hasAnyAuthority("Store Keeper", "Quantity Surveyor", "Project Manager", "Project Creation Team")
                        .requestMatchers("/skeeperonly/**").hasAnyAuthority("Store Keeper")
                        .requestMatchers("/user/**").hasAnyAuthority("USER")
                        .requestMatchers("/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}
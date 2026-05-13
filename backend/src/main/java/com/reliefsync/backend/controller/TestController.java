package com.reliefsync.backend.controller;

import java.security.Principal;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/protected")
    public Map<String, String> protectedEndpoint(Principal principal) {
        return Map.of(
                "message", "Protected endpoint reached successfully",
                "authenticatedUser", principal.getName()
        );
    }
}

package com.reliefsync.backend.service;

import com.reliefsync.backend.model.User;
import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    User save(User user);
}

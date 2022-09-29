package com.rsys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsys.pojos.entity.PasswordResetToken;

public interface IPasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

	Optional<PasswordResetToken> findByToken(String token);

}

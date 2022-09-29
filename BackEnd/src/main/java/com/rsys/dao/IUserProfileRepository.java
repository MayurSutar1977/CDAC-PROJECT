package com.rsys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserProfile;

public interface IUserProfileRepository extends JpaRepository<UserProfile, Integer> {

	@Query(value = "select u from UserProfile u where u.user=:user")
	Optional<UserProfile> getUserProfile(User user);

}

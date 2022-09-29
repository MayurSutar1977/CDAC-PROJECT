package com.rsys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsys.pojos.entity.UserAddress;
import com.rsys.pojos.entity.UserProfile;

public interface IUserAddressRepository extends JpaRepository<UserAddress, Integer> {

	Optional<UserAddress> findByUserProfile(UserProfile userProfile);

}

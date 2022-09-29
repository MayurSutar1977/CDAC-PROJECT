package com.rsys.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.User;
import com.rsys.pojos.enums.UserRole;

public interface IUserRepository extends JpaRepository<User, Integer> {

	@Query(value = "select u from User u where u.userName=:userName and u.password=:password")
	Optional<User> autenticateUser(String userName, String password);

	Optional<User> findByUserName(String userName);

	List<User> findByUserRole(UserRole customer);

	@Query("select count(*) from User u where month(u.registrationDate) = :month and userRole=:userRole ")
	Integer countForMonth(Integer month,UserRole userRole);

	@Query("SELECT distinct month(u.registrationDate) FROM User u where userRole=:userRole")
	List<Integer> getMontsOfRegistration(UserRole userRole);

}

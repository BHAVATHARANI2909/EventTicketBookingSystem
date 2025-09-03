package com.example.demo.repositoryInt;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.UserModel;

public interface UserRespository extends JpaRepository<UserModel,Long>{

}

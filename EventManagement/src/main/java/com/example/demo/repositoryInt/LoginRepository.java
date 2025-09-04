package com.example.demo.repositoryInt;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.LoginModel;

public interface LoginRepository extends JpaRepository<LoginModel, Long>{

}

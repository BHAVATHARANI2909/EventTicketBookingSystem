package com.example.demo.repositoryInt;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.AdminModel;

public interface AdminRepository extends JpaRepository<AdminModel,Long>{

}

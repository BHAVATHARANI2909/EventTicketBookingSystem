package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.AdminDto;
import com.example.demo.Model.AdminModel;
import com.example.demo.repositoryInt.AdminRepository;

@Service
public class AdminLoginService {

	@Autowired
	public AdminRepository adminRepository;
	
	public AdminModel login(AdminDto adminDto) {
		AdminModel admin = new AdminModel();
		admin.setUsername(adminDto.getUsername());
		admin.setPassword(adminDto.getPassword());
		return adminRepository.save(admin);
		
	}
	
	public List<AdminModel>getAdmin(){
		return adminRepository.findAll();
	}
}

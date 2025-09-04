package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.LoginDto;
import com.example.demo.Model.AdminModel;
import com.example.demo.Model.LoginModel;
import com.example.demo.repositoryInt.LoginRepository;

@Service
public class LoginService {

	@Autowired
	public LoginRepository loginRepository;
	
	public LoginModel login(LoginDto loginDto) {
		LoginModel login = new LoginModel();
		login.setUsername(loginDto.getUsername());
		login.setPassword(loginDto.getPassword());
		login.setEmail(loginDto.getEmail());
		login.setPhone(loginDto.getPhone());
		return loginRepository.save(login);
		
	}
	
	public List<LoginModel>getallLogin(){
		return loginRepository.findAll();
	}
}

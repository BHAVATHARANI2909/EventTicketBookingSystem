package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.UserDto;
import com.example.demo.Model.LoginModel;
import com.example.demo.Model.UserModel;
import com.example.demo.repositoryInt.UserRespository;

@Service
public class UserService {

	@Autowired
	public UserRespository userrespository;
	
	public UserModel user(UserDto dto) {
		UserModel user= new UserModel();
		user.setUsername(dto.getUsername());
		user.setEmail(dto.getEmail());
		user.setNumber(dto.getNumber());
		user.setCardno(dto.getCardno());
		user.setExpriedate(dto.getExpriedate());
		user.setCvv(dto.getCvv());
		return userrespository.save(user);
		
	}
	
	public List<UserModel>getallUser(){
		return userrespository.findAll();
	}
}

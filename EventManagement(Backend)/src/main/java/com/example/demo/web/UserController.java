package com.example.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.AdminDto;
import com.example.demo.Dto.UserDto;
import com.example.demo.Model.AdminModel;
import com.example.demo.Model.UserModel;
import com.example.demo.service.UserService;

@CrossOrigin("http://localhost:5173")
@RestController
public class UserController {

	@Autowired
	public UserService userservice;
	
	@GetMapping("/getAllUser")
	public List<UserModel> findAll() {
		return userservice.getallUser();
	}
	
	@PostMapping("/saveUser")
	public UserModel saveDonor(@RequestBody UserDto userDto) {
		return userservice.user(userDto);
	}
}

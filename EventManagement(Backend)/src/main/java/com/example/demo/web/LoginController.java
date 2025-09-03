package com.example.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.LoginDto;
import com.example.demo.Model.LoginModel;
import com.example.demo.service.LoginService;

@CrossOrigin("http://localhost:5173")
@RestController
public class LoginController {

	@Autowired
	public LoginService loginService;
	
	@GetMapping("/getAllLogin")
	public List<LoginModel> findAll() {
		return loginService.getallLogin();
	}
	
	@PostMapping("/saveLogin")
	public LoginModel saveDonor(@RequestBody LoginDto loginDto) {
		return loginService.login(loginDto);
	}
}

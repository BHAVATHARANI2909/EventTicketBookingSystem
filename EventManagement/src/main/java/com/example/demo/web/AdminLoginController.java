package com.example.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.AdminDto;

import com.example.demo.Model.AdminModel;
import com.example.demo.service.AdminLoginService;

@CrossOrigin("http://localhost:5173")
@RestController
public class AdminLoginController {

	@Autowired
	public AdminLoginService adminLoginService;
	
	@GetMapping("/getAllAdmin")
	public List<AdminModel> findAll() {
		return adminLoginService.getAdmin();
	}
	
	@PostMapping("/saveAdmin")
	public AdminModel saveDonor(@RequestBody AdminDto adminDto) {
		return adminLoginService.login(adminDto);
	}
}

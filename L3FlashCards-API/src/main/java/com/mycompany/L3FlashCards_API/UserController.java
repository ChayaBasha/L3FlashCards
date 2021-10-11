package com.mycompany.L3FlashCards_API;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/")
public class UserController {

	@Autowired
	private UserRepository repository;

	@PostMapping("/login")
	public User getUser(@RequestBody User user) {
		User currentUser = repository.findByUserName(user.getUserName()).orElseGet(() -> {
			return null;
		});

		if (currentUser == null) {
			throw new NotFoundException();
		} else if (!currentUser.getPassword().equals(user.getPassword())) {
			throw new NotFoundException();
			
		} 
		
		return currentUser;
	}

	@PostMapping("/register")
	User newUser(@RequestBody User newUser) {
		return repository.save(newUser);
	}

}

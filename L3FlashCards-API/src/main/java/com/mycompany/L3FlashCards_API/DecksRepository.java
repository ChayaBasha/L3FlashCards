package com.mycompany.L3FlashCards_API;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DecksRepository extends MongoRepository<FCDeck, String> {
	
	Optional<FCDeck> findById(String id);

}

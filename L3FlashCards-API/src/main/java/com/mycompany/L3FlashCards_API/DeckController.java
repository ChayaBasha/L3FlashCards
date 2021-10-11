package com.mycompany.L3FlashCards_API;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/decks")
public class DeckController {

	@Autowired
	private DecksRepository repository;

	// CRUD Functions for Decks
	@GetMapping()
	public List<FCDeck> getAllDecks() {
		return repository.findAll();
	}

	@PostMapping("/user/{currentUserId}")
	FCDeck newDeck(@RequestBody FCDeck newDeck, @PathVariable("currentUserId") String currentUserId) {
		newDeck.setOwner(currentUserId);
		return repository.save(newDeck);
	}

	@PutMapping("/{id}/user/{currentUserId}")
	FCDeck updateDeck(@RequestBody FCDeck updatedDeck, @PathVariable("id") String id,
			@PathVariable("currentUserId") String currentUserId) {
		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});

		if (deck == null) {
			throw new NotFoundException();
		}

		deck.setName(updatedDeck.getName());
		deck.setDescription(updatedDeck.getDescription());
		deck.setCreatedBy(updatedDeck.getCreatedBy());
		deck.setCreatedDate(updatedDeck.getCreatedDate());
		deck.setVisibility(updatedDeck.isVisibility());
		deck.setOwner(currentUserId);

		return repository.save(deck);

	}

	@DeleteMapping("/{id}/user/{currentUserId}")
	void deleteDeck(@PathVariable String id, @PathVariable("currentUserId") String currentUserId) {
		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});
		if (deck == null) {
			throw new NotFoundException();

		} else if (currentUserId.equals(deck.getOwner())) {
			repository.deleteById(id);
		}
		System.out.println("something went wrong");
	}

	// CRUD Functions for Cards

	@GetMapping("/{id}")
	public FCDeck getDeck(@PathVariable("id") String id) {
		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});

		if (deck == null) {
			throw new NotFoundException();
		}
		return deck;
	}

	@PostMapping("/{id}/user/{currentUserId}/cards")
	FCDeck addCard(@RequestBody Card addCard, @PathVariable("id") String id,
			@PathVariable("currentUserId") String currentUserId) {

		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});

		if (deck == null) {
			throw new NotFoundException();
		}
		if (!currentUserId.equals(deck.getOwner())) {
			throw new NotFoundException();
		}
		List<Card> deckCards = deck.getCards();
		int deckLength = deckCards.toArray().length;
		if (addCard.getCardOrder() <= 0) {
			addCard.setCardOrder(deckLength + 1);
		}
		List<Card> newCards = new ArrayList<Card>();
		newCards.add(addCard);
		deckCards.addAll(newCards);

		deck.setCards(deckCards);

		return repository.save(deck);
	}

	@PutMapping("/{id}/user/{currentUserId}/cards/{cardOrder}")
	FCDeck updateCard(@RequestBody Card updateCard, @PathVariable("id") String id,
			@PathVariable("currentUserId") String currentUserId, @PathVariable("cardOrder") int cardOrder) {
		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});

		if (deck == null) {
			throw new NotFoundException();
		}
		if (!currentUserId.equals(deck.getOwner())) {
			throw new NotFoundException();
		}
		List<Card> deckCards = deck.getCards();
		Card[] cards = new Card[deckCards.size()];
		cards = deckCards.toArray(cards);

		for (int i = 0; i < cards.length; i++) {
			Card currentCard = cards[i];
			if (currentCard.getCardOrder() == cardOrder) {
				currentCard.setBackCard(updateCard.getBackCard());
				currentCard.setFrontCard(updateCard.getFrontCard());
				currentCard.setCardOrder(updateCard.getCardOrder());

				return repository.save(deck);
			}
		}
		throw new NotFoundException();
	}

	@DeleteMapping("/{id}/user/{currentUserId}/cards/{cardOrder}")
	FCDeck deleteCard(@PathVariable("id") String id, @PathVariable("currentUserId") String currentUserId,
			@PathVariable("cardOrder") int cardOrder) {
		FCDeck deck = repository.findById(id).orElseGet(() -> {
			return null;
		});

		if (deck == null) {
			throw new NotFoundException();

		}
		if (!currentUserId.equals(deck.getOwner())) {
			throw new NotFoundException();
		}

		List<Card> deckCards = deck.getCards();

		for (int i = 0; i < deckCards.size(); i++) {
			Card currentCard = deckCards.get(i);
			if (currentCard.getCardOrder() == cardOrder) {
				deckCards.remove(currentCard);
				return repository.save(deck);
			}
		}
		throw new NotFoundException();
	}
};

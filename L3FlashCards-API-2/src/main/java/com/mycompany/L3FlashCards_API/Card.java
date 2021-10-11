package com.mycompany.L3FlashCards_API;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "decks")
public class Card {

	private List<String> frontCard;
	private List<String> backCard;
	private int cardOrder = 0;

	public List<String> getFrontCard() {
		return frontCard;
	}

	public void setFrontCard(List<String> frontCard) {
		if (frontCard != null) {
			this.frontCard = frontCard;
		}
	}

	public List<String> getBackCard() {
		return backCard;
	}

	public void setBackCard(List<String> backCard) {
		if (backCard != null) {
			this.backCard = backCard;
		}
	}

	public int getCardOrder() {
		return cardOrder;
	}

	public void setCardOrder(int cardOrder) {
		if (cardOrder != 0) {
		this.cardOrder = cardOrder;
		}
	}

}

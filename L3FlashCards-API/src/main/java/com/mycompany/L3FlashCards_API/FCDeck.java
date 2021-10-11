package com.mycompany.L3FlashCards_API;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "decks")
public class FCDeck {

	@Id
	private String id;

	private String name;
	private String description;
	private List<Card> cards = new ArrayList<Card>();
	private String createdBy;
	private Boolean visibility;
	private Date createdDate = new Date();
	private String owner;

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		if (name != null) {
			this.name = name;
		}
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		if (description != null) {
			this.description = description;
		}
	}

	public List<Card> getCards() {
		return cards;
	}

	public void setCards(List<Card> cards) {

		this.cards = cards;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		if (createdBy != null) {
			this.createdBy = createdBy;
		}
	}

	public Boolean isVisibility() {
		return visibility;
	}

	public void setVisibility(Boolean visibility) {
		if (visibility != null) {
			this.visibility = visibility;
		}
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		if (createdDate != null) {
			this.createdDate = createdDate;
		} else {
			Date todaysDate = new Date();
			this.createdDate = todaysDate;
		}
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String currentUserId) {
		if (currentUserId != null) {
			System.out.println(currentUserId);
			this.owner = currentUserId;
		}
	}

}
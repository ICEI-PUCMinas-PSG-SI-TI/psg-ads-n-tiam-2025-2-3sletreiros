package com.tiam.tiam.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.tiam.tiam.services.OrderItemService;
import com.tiam.tiam.models.OrderItem;
import java.util.List;
import java.util.UUID;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

	private OrderItemService service;

	public OrderItemController(OrderItemService service) {
		this.service = service;
	}

	@GetMapping
	public ResponseEntity<List<OrderItem>> getAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderItem> getById(@PathVariable UUID id) {
		try {
			return ResponseEntity.ok(service.findById(id));
		} catch (NoSuchElementException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PostMapping
	public ResponseEntity<OrderItem> create(@RequestBody OrderItem item) {
		OrderItem created = service.create(item);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<OrderItem> update(@PathVariable UUID id,@RequestBody OrderItem item) {
		try {
			return ResponseEntity.ok(service.update(id, item));
		} catch (NoSuchElementException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		try {
			service.delete(id);
			return ResponseEntity.noContent().build();
		} catch (NoSuchElementException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}

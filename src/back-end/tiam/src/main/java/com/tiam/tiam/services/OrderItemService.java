package com.tiam.tiam.services;

import org.springframework.stereotype.Service;
import com.tiam.tiam.models.OrderItem;
import com.tiam.tiam.repositories.OrderItemRepository;
import java.util.List;
import java.util.UUID;
import java.util.NoSuchElementException;

@Service
public class OrderItemService {

	private OrderItemRepository orderItemRepository;

	public OrderItemService(OrderItemRepository orderItemRepository) {
		this.orderItemRepository = orderItemRepository;
	}

	public List<OrderItem> findAll() {
		return orderItemRepository.findAll();
	}

	public OrderItem findById(UUID id) {
		return orderItemRepository.findById(id)
			.orElseThrow(() -> new NoSuchElementException("OrderItem not found: " + id));
	}

	public OrderItem create(OrderItem orderItem) {
		orderItem.setId(null);
        orderItem.setValue(orderItem.getProduct().getPrice() * orderItem.getQuantity());
		return orderItemRepository.save(orderItem);
	}

	public OrderItem update(UUID id, OrderItem orderItem) {
		OrderItem existing = findById(id);
		existing.setQuantity(orderItem.getQuantity());
		existing.setValue(existing.getProduct().getPrice() * existing.getQuantity());
		existing.setObservation(orderItem.getObservation());
		existing.setProduct(orderItem.getProduct());
		existing.setSale(orderItem.getSale());
		return orderItemRepository.save(existing);
	}

	public void delete(UUID id) {
		if (!orderItemRepository.existsById(id)) {
			throw new NoSuchElementException("OrderItem not found: " + id);
		}
		orderItemRepository.deleteById(id);
	}

}

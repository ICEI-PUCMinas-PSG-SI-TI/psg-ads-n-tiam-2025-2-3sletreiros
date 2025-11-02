package com.tiam.tiam.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import com.tiam.tiam.services.SaleService;
import com.tiam.tiam.models.Sale;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

	private final SaleService saleService;

	public SaleController(SaleService saleService) {
		this.saleService = saleService;
	}

	@PostMapping("create")
	public ResponseEntity<Sale> create(@Valid @RequestBody Sale sale) {
		Sale created = saleService.create(sale);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@GetMapping
	public ResponseEntity<List<Sale>> listAll() {
		return ResponseEntity.ok(saleService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sale> getById(@PathVariable UUID id) {
		return ResponseEntity.ok(saleService.findById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Sale> update(@PathVariable UUID id, @Valid @RequestBody Sale sale) {
		return ResponseEntity.ok(saleService.update(id, sale));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		saleService.delete(id);
		return ResponseEntity.noContent().build();
	}
}

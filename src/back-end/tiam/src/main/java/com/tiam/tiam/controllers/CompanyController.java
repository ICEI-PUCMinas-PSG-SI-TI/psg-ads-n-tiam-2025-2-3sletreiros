package com.tiam.tiam.controllers;

import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.tiam.tiam.models.Company;
import com.tiam.tiam.services.CompanyService;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping("create")
	public ResponseEntity<Company> create(@RequestBody Company company) {
		Company created = companyService.createCompany(company);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Company> getById(@PathVariable UUID id) {
		return ResponseEntity.ok(companyService.getCompanyById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Company> update(@PathVariable UUID id, @RequestBody Company company) {
		return ResponseEntity.ok(companyService.updateCompany(id, company));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		companyService.deleteCompany(id);
		return ResponseEntity.noContent().build();
	}
}

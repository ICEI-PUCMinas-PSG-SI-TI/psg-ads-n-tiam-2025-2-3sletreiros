package com.tiam.tiam.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiam.tiam.models.Company;

public interface CompanyRepository extends JpaRepository<Company,UUID> {
    
}

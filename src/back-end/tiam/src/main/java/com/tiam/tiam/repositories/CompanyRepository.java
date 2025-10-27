package com.tiam.tiam.repositories;

<<<<<<< HEAD
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiam.tiam.models.Company;

public interface CompanyRepository extends JpaRepository<Company,UUID> {
    
}
=======
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.tiam.tiam.models.Company;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
}
>>>>>>> CompanyTaks

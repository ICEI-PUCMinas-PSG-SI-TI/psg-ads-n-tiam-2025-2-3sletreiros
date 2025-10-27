package com.tiam.tiam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.tiam.tiam.models.Company;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
}
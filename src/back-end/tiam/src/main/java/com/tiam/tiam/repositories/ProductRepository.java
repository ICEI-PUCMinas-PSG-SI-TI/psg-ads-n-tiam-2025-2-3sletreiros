package com.tiam.tiam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.tiam.tiam.models.Product;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    
}

package com.tiam.tiam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tiam.tiam.models.Sale;
import java.util.UUID;

public interface SaleRepository extends JpaRepository<Sale, UUID> {
	// ... nenhum método adicional por enquanto ...
}

package com.tiam.tiam.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tiam.tiam.models.Sale;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

}

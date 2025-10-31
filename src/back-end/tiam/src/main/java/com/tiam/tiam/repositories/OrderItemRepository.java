package com.tiam.tiam.repositories;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tiam.tiam.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {

}

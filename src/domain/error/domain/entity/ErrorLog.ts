import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("ErrorLog", { schema: "nest" })
export class ErrorLog {
  @PrimaryGeneratedColumn({ type: "int", name: "error_log_id" })
  error_log_id: number;

  @Column("varchar", { name: "level", length: 10 })
  level: string;

  @Column("varchar", { name: "timestamp", length: 45 })
  timestamp: string;

  @Column("varchar", { name: "message", length: 500 })
  message: string;
}

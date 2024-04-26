import { Column, Entity } from "typeorm";

@Entity("_prisma_migrations", { schema: "nest" })
export class PrismaMigrations {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "checksum", length: 64 })
  checksum: string;

  @Column("datetime", { name: "finished_at", nullable: true })
  finishedAt: Date | null;

  @Column("varchar", { name: "migration_name", length: 255 })
  migrationName: string;

  @Column("text", { name: "logs", nullable: true })
  logs: string | null;

  @Column("datetime", { name: "rolled_back_at", nullable: true })
  rolledBackAt: Date | null;

  @Column("datetime", {
    name: "started_at",
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  startedAt: Date;

  @Column("int", {
    name: "applied_steps_count",
    unsigned: true,
    default: () => "'0'",
  })
  appliedStepsCount: number;
}

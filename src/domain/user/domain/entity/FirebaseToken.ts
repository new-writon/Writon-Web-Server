import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation
  } from "typeorm";

import { BaseEntity } from "../../../../global/entity/base.entitiy";
import { User } from "./User";
  
  
  

@Entity("firebase_tokens")
export class FirebaseToken extends BaseEntity{
  
    @PrimaryGeneratedColumn({ type: "int", name: "firebase_token_id" })
    firebaseTokenId: number;
  
    @Column("varchar", { name: "engine_value"})
    engineValue: string;

    @Column("int", { name: "user_id" })
    userId: number;

    @ManyToOne(() => User, (user) => user.firebaseTokens, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    @JoinColumn([
    { name: "user_id", referencedColumnName: "userId" },
    ])
    user: Relation<User>;

  
}
  
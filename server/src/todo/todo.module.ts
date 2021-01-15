import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TodoResolver } from "./todo.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}

import { Container } from "inversify";
import { TYPES } from "./type";
import { repositoryModule } from "./modules/repositoryModule";
import { serviceModule } from "./modules/serviceModule";
import { controllerModule } from "./modules/controllerModule";
import { ExpressApp } from "../../App";
import { AppDataSource } from "../../core/db";
import { DataSource } from "typeorm";
import { cliLogger } from "../../core/logger";

const container = new Container();

const init = async (port: number) => {
    try {
        await AppDataSource.initialize();
    } catch (error) {
        cliLogger.error(error);
    }
    cliLogger.info("Database is connected");
    container.bind<DataSource>(TYPES.TypeORMDataSource).toConstantValue(AppDataSource);

    container.load(repositoryModule);
    container.load(serviceModule);
    container.load(controllerModule);

    const App = new ExpressApp();
    App.listen(port);
};

const getContainer = () => container;

export { init, getContainer };

import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let challenges = [
      {
        id: 1,
        name: 'Палиндромы',
        description: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        status: ChallengeStatus.NotStarted,
        author: 'Сергей Остапов',
        created: new Date('02 06 2017'),
        tags: ["строка"],
      },
      {
        id: 2,
        name: 'Факториал',
        description: 'На вход подается число n. Метод должен вычислить и вернуть факториал n',
        status: ChallengeStatus.InProgress,
        author: 'Анна Козина',
        created: new Date('02 09 2017'),
        tags: ["рекурсия"],
      },
      {
        id: 3,
        name: 'Сумма элементов',
        description: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        status: ChallengeStatus.Completed,
        author: 'Аркадий Петренко',
        created: new Date('02 11 2017'),
        tags: ["массив","цикл"],
      },
    ];
    return {challenges};
  }
}


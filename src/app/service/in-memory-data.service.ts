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
        author: 'Игорь',
        created: new Date('02 06 2017'),
        tags: ["строка"],
        likes: 5,
      },
      {
        id: 2,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.InProgress,
        author: 'Марина',
        created: new Date('02 09 2017'),
        tags: ["рекурсия"],
      },
      {
        id: 3,
        name: 'Сумма элементов',
        description: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        status: ChallengeStatus.Completed,
        author: 'Михаил',
        created: new Date('02 11 2017'),
        tags: ["массив","цикл"],
        likes: 12,
      },
      {
        id: 4,
        name: 'Палиндромы',
        description: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        status: ChallengeStatus.NotStarted,
        author: 'Сергей',
        created: new Date('02 06 2017'),
        tags: ["строка"],
      },
      {
        id: 5,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.NotStarted,
        author: 'Анна',
        created: new Date('02 09 2017'),
        tags: ["рекурсия"],
      },
      {
        id: 6,
        name: 'Сумма элементов',
        description: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        status: ChallengeStatus.InProgress,
        author: 'Аркадий',
        created: new Date('02 11 2017'),
        tags: ["массив","цикл"],
        likes: 2,
      },
    ];
    return {challenges};
  }
}


import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let challenges = [
      {
        id: 1,
        name: 'Палиндромы',
        description: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        status: ChallengeStatus.NotStarted,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ["цикл"],
        likes: 5,
        liked: true,
        comments: 12,
      },
      {
        id: 2,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.InProgress,
        author: 'Марина',
        created: new Date('02 25 2017'),
        tags: ["рекурсия", "математика"],
        comments: 4,
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
        likes: 15,
        liked: true,
        comments: 26,
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
        comments: 12,
      },
    ];

    let tags: Tag[] = [
      new Tag("Массивы", 3),
      new Tag("Списки", 7),
      new Tag("Рекурсия", 12),
      new Tag("Строки", 10),
      new Tag("Математика", 6),
      new Tag("Бинарные операции", 4),
      new Tag("Ввод-вывод", 2),
    ];

    let users = [
      {username: "admin", password: "1234"},
      {username: "user",  password: "1"},
    ];

    return {challenges, tags, users};
  }}


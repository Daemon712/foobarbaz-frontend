import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let defaultSolutionTemplate =
      "public class Foo {\n" +
      "\tpublic int bar() {\n" +
      "\t\t//...\n" +
      "\t\treturn 0;\n" +
      "\t}\n}";

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
        views: 52,
        solutions: 12,
        solutionTemplate: defaultSolutionTemplate,
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
        views: 85,
        solutions: 32,
        solutionTemplate: defaultSolutionTemplate,
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
        views: 110,
        solutions: 56,
        solutionTemplate: defaultSolutionTemplate,
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
        views: 32,
        solutions: 8,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 5,
        name: 'Факториал',
        description: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        status: ChallengeStatus.NotStarted,
        author: 'Анна',
        created: new Date('02 09 2017'),
        tags: ["рекурсия"],
        views: 45,
        solutions: 5,
        solutionTemplate: defaultSolutionTemplate,
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
        views: 10,
        solutions: 0,
        solutionTemplate: defaultSolutionTemplate,
      },
    ];
    let tests: TestResult[] = [
      new TestResult("testOne",       TestStatus.success),
      new TestResult("testTwo",       TestStatus.success),
      new TestResult("testThree",     TestStatus.success),
      new TestResult("testZero",      TestStatus.failed,  "Ожидалось: 1, Результат: 0"),
      new TestResult("testInfinity",  TestStatus.ignored),
      new TestResult("testNegative",  TestStatus.error,   "ArithmeticException"),
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

    let comments = [
      {
        id: 1,
        author: 'Петр',
        text: 'Отличная задача! Решил с удовольствием',
        date: new Date('02 11 2017'),
      },
      {
        id: 2,
        author: 'Оксана',
        text: 'Сложно. Два джня думала(',
        date: new Date('02 12 2017'),
      },
      {
        id: 3,
        author: 'Михаил',
        text: 'Так и не смог решить...',
        date: new Date('02 12 2017'),
      },
      {
        id: 4,
        author: 'Татьяна',
        text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)',
        date: new Date('02 13 2017'),
      },
      {
        id: 5,
        author: 'Диана',
        text: 'Слишком просто.',
        date: new Date('02 14 2017'),
      },
      {
        id: 6,
        author: 'Алексей',
        text: 'В школе такую на паскале решал)',
        date: new Date('02 11 2017'),
      },
    ];

    return {
      challenges,
      tests,
      tags,
      users,
      comments,
    };
  }}


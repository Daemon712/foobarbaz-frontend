import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";
import {UserAccount} from "../model/user-account";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let defaultDescription = '<h2>Заголовок</h2>Равным образом новая модель играет важную роль в ' +
      'формировании соответствующий условий активизации. Повседневная практика показывает, ' +
      'что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу ' +
      '(специалистов) участие в <i>формировании модели развития</i>. Таким образом реализация ' +
      'намеченных плановых заданий представляет собой интересный эксперимент проверки модели ' +
      'развития.<br/>Идейные соображения высшего порядка, а также рамки и место обучения кадров ' +
      'способствует подготовки и реализации позиций, занимаемых участниками в отношении ' +
      'поставленных задач. <b>Задача организации</b>, в особенности же укрепление и развитие ' +
      'структуры влечет за собой процесс внедрения и модернизации системы обучения кадров, ' +
      'соответствует насущным потребностям. <u>Товарищи!</u> укрепление и развитие структуры в ' +
      'значительной степени обуславливает создание системы обучения кадров, соответствует ' +
      'насущным потребностям.';

    let defaultSolutionTemplate =
      "public class Foo {\n" +
      "\tpublic int sum(int[] array) {\n" +
      "\t\tint x = 0;\n" +
      "\t\t\n" +
      "\t\t//...\n" +
      "\t\t\n" +
      "\t\treturn x;\n" +
      "\t}\n}";

    let challenges = [
      {
        id: 1,
        name: 'Палиндромы',
        abstract: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        description: defaultDescription,
        status: ChallengeStatus.NotStarted,
        author: 'Игорь',
        created: new Date('03 01 2017'),
        tags: ["Циклы", "Строки"],
        rating: 0.4,
        difficulty: 0.6,
        comments: 12,
        views: 52,
        solutions: 12,
        sharedSolutions: 3,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 2,
        name: 'Факториал',
        abstract: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        description: defaultDescription,
        status: ChallengeStatus.InProgress,
        author: 'Марина',
        created: new Date('02 25 2017'),
        tags: ["Рекурсия", "Математика"],
        rating: 0.2,
        difficulty: 0.9,
        comments: 4,
        views: 85,
        solutions: 32,
        sharedSolutions: 9,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 3,
        name: 'Сумма элементов',
        abstract: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        description: defaultDescription,
        status: ChallengeStatus.Completed,
        author: 'Михаил',
        created: new Date('02 11 2017'),
        tags: ["Массивы", "Циклы"],
        rating: 0.8,
        difficulty: 0.4,
        views: 110,
        solutions: 56,
        sharedSolutions: 12,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 4,
        name: 'Палиндромы',
        abstract: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        description: defaultDescription,
        status: ChallengeStatus.NotStarted,
        author: 'Сергей',
        created: new Date('02 06 2017'),
        tags: ["Циклы", "Строки"],
        rating: 0.5,
        difficulty: 0.2,
        comments: 26,
        views: 32,
        solutions: 8,
        sharedSolutions: 2,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 5,
        name: 'Факториал',
        abstract: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        description: defaultDescription,
        status: ChallengeStatus.NotStarted,
        author: 'Анна',
        created: new Date('02 09 2017'),
        tags: ["Рекурсия", "Математика"],
        rating: 0.9,
        difficulty: 0.2,
        views: 45,
        solutions: 5,
        solutionTemplate: defaultSolutionTemplate,
      },
      {
        id: 6,
        name: 'Сумма элементов',
        abstract: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        description: defaultDescription,
        status: ChallengeStatus.InProgress,
        author: 'Аркадий',
        created: new Date('02 11 2017'),
        tags: ["Массивы","Циклы"],
        rating: 0.1,
        difficulty: 0.1,
        comments: 12,
        views: 30,
        solutions: 7,
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
      {username: "admin", password: "1234", account: new UserAccount("admin", new Date('11 7 2016 9:30'))},
      {username: "user",  password: "1",    account: new UserAccount("user", new Date('11 17 2016 17:30'))},
      {username: "Петр", password: "1234",  account: new UserAccount("Петр", new Date('12 11 2016 19:30'))},
      {username: "Игорь", password: "1234", account: new UserAccount("Игорь", new Date('11 21 2016 20:30'))}
    ];

    let comments = [
      {
        id: 1,
        author: 'Петр',
        text: 'Отличная задача! Решил с удовольствием',
        likes: 3,
        date: new Date('02 11 2017 19:30'),
      },
      {
        id: 2,
        author: 'Оксана',
        text: 'Сложно. Два дня думала(',
        likes: 1,
        date: new Date('02 12 2017 09:51'),
      },
      {
        id: 3,
        author: 'Михаил',
        text: 'Так и не смог решить...',
        date: new Date('02 12 2017 22:46'),
      },
      {
        id: 4,
        author: 'Татьяна',
        text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)',
        date: new Date('02 13 2017 12:01'),
      },
      {
        id: 5,
        author: 'Диана',
        text: 'Слишком просто.',
        likes: 8,
        liked: true,
        date: new Date('02 14 2017 16:24'),
      },
      {
        id: 6,
        author: 'Алексей',
        text: 'В школе такую на паскале решал)',
        likes: 6,
        liked: true,
        date: new Date('02 11 2017 13:55'),
      },
    ];

    let revisions: Revision[] = [
      new Revision(1, 'Решение №1', SolutionStatus.failed,  new Date("03 02 2017 13:55"), defaultSolutionTemplate.replace('//...', 'int x = 1;')),
      new Revision(2, 'Решение №2', SolutionStatus.empty,   new Date("03 02 2017 16:24"), defaultSolutionTemplate.replace('//...', 'int y = 2;')),
      new Revision(3, 'Решение №3', SolutionStatus.error,   new Date("03 03 2017 12:01"), defaultSolutionTemplate.replace('//...', 'int a = 3;')),
      new Revision(4, 'Решение №4', SolutionStatus.failed,  new Date("03 03 2017 22:46"), defaultSolutionTemplate.replace('//...', 'int b = 4;')),
      new Revision(5, 'Решение №5', SolutionStatus.empty,   new Date("03 04 2017 09:51"), defaultSolutionTemplate.replace('//...', 'int c = 5;')),
      new Revision(6, 'Решение №6', SolutionStatus.success, new Date("03 06 2017 19:30"), defaultSolutionTemplate.replace('//...', 'int d = 6;')),
    ];

    let sharedSolutions: SharedSolution[] = [
      {
        id: 1,
        author: 'Анна',
        comment: 'Сделала! Все тесты проходят!',
        status: SolutionStatus.success,
        date: new Date("03 02 2017 13:55"),
        comments: 2,
        likes: 4,
        liked: false,
      },
      {
        id: 2,
        author: 'Сергей',
        comment: 'Ошибка? Где? Не понимаю... Подскажите плиз',
        status: SolutionStatus.error,
        date: new Date("03 03 2017 16:24"),
        comments: 8,
        likes: 0,
        liked: false,
      },
      {
        id: 3,
        author: 'Игорь',
        comment: 'Сделал решение всего в 2 строчки. Зацените!',
        status: SolutionStatus.success,
        date: new Date("03 03 2017 12:03"),
        comments: 0,
        likes: 9,
        liked: true,
      },
      {
        id: 4,
        author: 'Маша',
        comment: 'Думаю, мое решение самое эффективное. Можно еще оптимизировать?',
        status: SolutionStatus.success,
        date: new Date("03 04 2017 19:30"),
        comments: 2,
        likes: 6,
        liked: false,
      },
      {
        id: 5,
        author: 'Олег',
        comment: 'Как пройти последний тест?? Помогите! Я уже голову сломал!',
        status: SolutionStatus.failed,
        date: new Date("03 04 2017 22:14"),
        comments: 12,
        likes: 0,
        liked: false,
      },
  ];

    return {
      challenges,
      tests,
      tags,
      users,
      comments,
      revisions,
      sharedSolutions,
    };
  }}


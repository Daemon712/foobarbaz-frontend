import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";

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

    let playlists = [
      {
        id: 1,
        name: 'ТОП 5 задач с рекурсией',
        description: 'Чтобы понять рекурсию, надо понять рекурсию',
      },
      {
        id: 2,
        name: 'Лучшие задачки для новичка',
        description: 'Задачи самые простые, хорошо для тех кто только начал писать программы',
      },
      {
        id: 3,
        name: 'Сломай себе мозг!',
        description: '96% населения земли не могут решить эти задачи. А ты?',
      },
      {
        id: 4,
        name: 'Задачи, которые должен решить каждый!',
        description: 'Самые популярные задачи на собеседованиях',
      }
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
      {username: "admin", password: "1234", account: {
        username: "admin",
        description: "Создатель и действующий администратор сообщества",
        created: new Date('11 7 2016 9:30'),
        karma: 9999,
        challenges: 8,
        collections: 2,
        solved: 10,
        comments: 24,
        sharedSolutions: 5
      }},
      {username: "moderator", password: "1234", account: {
        username: "moderator",
        description: "Модератор, который модерирует",
        created: new Date('12 6 2016 19:30'),
        karma: 777,
        challenges: 11,
        collections: 4,
        solved: 13,
        comments: 115,
        sharedSolutions: 10
      }},
      {username: "user", password: "1234", account: {
        username: "user",
        description: "Типичный пользователь",
        created: new Date('1 3 2017 11:45'),
        karma: 15,
        challenges: 0,
        collections: 0,
        solved: 3,
        comments: 4,
        sharedSolutions: 1
      }},
      {username: "Игорь", password: "1234", account: {
        username: "Игорь",
        description: "Типичный пользователь",
        created: new Date('1 3 2017 11:45'),
        karma: 22,
        challenges: 0,
        collections: 0,
        solved: 3,
        comments: 4,
        sharedSolutions: 1
      }},
      {username: "Анна", password: "1234", account: {
        username: "Анна",
        description: "Типичный пользователь",
        created: new Date('1 3 2017 11:45'),
        karma: 2,
        challenges: 0,
        collections: 0,
        solved: 1,
        comments: 1,
        sharedSolutions: 0
      }},
      {username: "Борис", password: "1234", account: {
        username: "Борис",
        description: "Олег, где макет?",
        created: new Date('1 3 2017 11:45'),
        karma: 8,
        challenges: 1,
        collections: 0,
        solved: 6,
        comments: 12,
        sharedSolutions: 0
      }},
    ];

    let comments = [
      {
        id: 1,
        challengeId: 1,
        author: 'Петр',
        text: 'Отличная задача! Решил с удовольствием',
        likes: 3,
        date: new Date('02 11 2017 19:30'),
      },
      {
        id: 2,
        challengeId: 1,
        author: 'Оксана',
        text: 'Сложно. Два дня думала(',
        likes: 1,
        liked: true,
        date: new Date('02 12 2017 09:51'),
      },
      {
        id: 3,
        challengeId: 2,
        sharedSolId: null,
        author: 'Михаил',
        text: 'Так и не смог решить...',
        likes: 0,
        date: new Date('02 12 2017 22:46'),
      },
      {
        id: 4,
        challengeId: 2,
        sharedSolId: null,
        author: 'Татьяна',
        text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)',
        likes: 0,
        date: new Date('02 13 2017 12:01'),
      },
      {
        id: 5,
        challengeId: 1,
        author: 'Диана',
        text: 'Слишком просто.',
        likes: 8,
        liked: true,
        date: new Date('02 14 2017 16:24'),
      },
      {
        id: 6,
        challengeId: 1,
        author: 'Алексей',
        text: 'В школе такую на паскале решал)',
        likes: 6,
        liked: true,
        date: new Date('02 11 2017 13:55'),
      },
      {
        id: 7,
        challengeId: 1,
        sharedSolId: 1,
        author: 'Диана',
        text: 'Интересное решение...',
        likes: 0,
        date: new Date('02 14 2017 16:24'),
      },
      {
        id: 8,
        challengeId: 1,
        sharedSolId: 1,
        author: 'Алексей',
        text: 'Вместо LinkedList лучше использовать ArrayList',
        likes: 4,
        liked: true,
        date: new Date('02 11 2017 13:55'),
      },
      {
        id: 9,
        challengeId: 1,
        sharedSolId: 2,
        author: 'Сергей',
        text: 'Похоже на спаггети)',
        likes: 3,
        date: new Date('02 14 2017 16:24'),
      },
      {
        id: 10,
        challengeId: 2,
        sharedSolId: 2,
        author: 'Игорь',
        text: 'Добрый вечер',
        likes: 0,
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
        challengeId: 1,
        author: 'Анна',
        comment: 'Сделала! Все тесты проходят!',
        text: defaultSolutionTemplate.replace('//...', 'x += 4;'),
        status: SolutionStatus.success,
        date: new Date("03 02 2017 13:55"),
        testResults: tests,
        comments: 2,
        likes: 4,
        liked: false,
      },
      {
        id: 2,
        challengeId: 1,
        author: 'Сергей',
        comment: 'Ошибка? Где? Не понимаю... Подскажите плиз',
        text: defaultSolutionTemplate.replace('//...', 'x--;'),
        status: SolutionStatus.error,
        date: new Date("03 03 2017 16:24"),
        testResults: tests,
        comments: 8,
        likes: 0,
        liked: false,
      },
      {
        id: 3,
        challengeId: 2,
        author: 'Игорь',
        comment: 'Сделал решение всего в 2 строчки. Зацените!',
        text: defaultSolutionTemplate.replace('//...', 'x *= 2;'),
        status: SolutionStatus.success,
        date: new Date("03 03 2017 12:03"),
        testResults: tests,
        comments: 0,
        likes: 9,
        liked: true,
      },
      {
        id: 4,
        challengeId: 2,
        author: 'Маша',
        comment: 'Думаю, мое решение самое эффективное. Можно еще оптимизировать?',
        text: defaultSolutionTemplate.replace('//...', 'x = 10;'),
        status: SolutionStatus.success,
        date: new Date("03 04 2017 19:30"),
        testResults: tests,
        comments: 2,
        likes: 6,
        liked: false,
      },
      {
        id: 5,
        challengeId: 2,
        author: 'Олег',
        comment: 'Как пройти последний тест?? Помогите! Я уже голову сломал!',
        text: defaultSolutionTemplate.replace('//...', 'x++;'),
        status: SolutionStatus.failed,
        date: new Date("03 04 2017 22:14"),
        testResults: tests,
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
      playlists,
    };
  }}


import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ChallengeStatus} from "../model/challenge";
import {Tag} from "../model/tag";
import {TestResult, TestStatus} from "../model/test-result";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {username: "admin", account: {description: "Создатель и действующий администратор сообщества"}},
      {username: "moderator", account: {description: "Модератор, который модерирует"}},
      {username: "user", account: {description: "Типичный пользователь"}},
      {username: "Игорь", account: {description: "Выпьем за любовь?"}},
      {username: "Анна", account: {description: "Описание Описание Описание"}},
      {username: "Борис", account: {description: "Олег, где макет?"}},
      {username: "Марина", account: {description: "Доброе утро"}},
      {username: "Сергей", account: {description: "Добрый вечер"}},
      {username: "Николай", account: {description: "Ла ла ли ла лай"}},
      {username: "Владимир", account: {description: "..."}},
    ];

    users.forEach((u: any) => {
      u.password = '1234';
      u.account.username = u.username;
      u.account.created = new Date(2017, 1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
      u.account.karma = Math.floor(Math.random() * 300);
      u.account.challenges = Math.floor(Math.random() * 10);
      u.account.playlists = Math.floor(Math.random() * 5);
      u.account.solved = Math.floor(Math.random() * 30);
      u.account.comments = Math.floor(Math.random() * 50);
      u.account.sharedSolutions = Math.floor(Math.random() * 20);
    });

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
        name: 'Палиндромы',
        abstract: 'На вход подается строка. Нужно определить, является ли строка палиндромом',
        tags: ["Циклы", "Строки"],
      },
      {
        name: 'Факториал',
        abstract: 'На вход подается целое число n. Метод должен вычислить и вернуть !n',
        tags: ["Рекурсия", "Математика"],
      },
      {
        name: 'Сумма элементов',
        abstract: 'На вход подается массив целых чисел. Посчитайте сумму элеметов массива',
        tags: ["Массивы", "Циклы"],
      },
      {
        name: 'Hello world',
        abstract: 'Все просто! Выведите на экран фразу "Hello world!"',
        tags: ["Строки"],
      },
      {
        name: 'Возведение в степень',
        abstract: 'Есть два целых число a и b. Программа должна вычеслить a в степени b',
        tags: ["Рекурсия", "Математика"],
      },
      {
        name: 'Сумма элементов дерева',
        abstract: 'Вам дано дерево. Каждый элемент дерева содержит число, посчитайте сумму всех этих чисел',
        tags: ["Дерево","Рекурсия"],
      },
      {
        name: 'Число Фибоначчи',
        abstract: 'На вход программе подается число N, верните N-ое число в последовательности чисел Фибоначчи',
        tags: ["Математика","Рекурсия","Последовательность"],
      },
      {
        name: 'Наименьшее из 3 чисел',
        abstract: 'Вам дано 3 числа: a, b, c. Верните наибольшее из них',
        tags: ["Числа"],
      },
      {
        name: 'Четность числа',
        abstract: 'Есть число. Верните true, если оно четное. Иначе верните false',
        tags: ["Числа"],
      },
      {
        name: 'Убрать гласные из строки',
        abstract: 'Вам дана строка состоящая из букв латинского алфавита, цифр и заков препинания. Верните кописю строки без гласных букв (a, e, u, i, o)',
        tags: ["Строки"],
      },
      {
        name: 'Количество четных элементов',
        abstract: 'На вход программе подается массив целых чисел. Посчитайте количество четных чисел в массиве',
        tags: ["Массивы","Числа"],
      },
      {
        name: 'Бесконечный поезд',
        abstract: 'Представьте себе замкнутую по окружности железную дорогу. По ней едет поезд. Вы оказались в одном случайном вагоне и ваша задача — подсчитать их общее количество.',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Сбрасываем яйцо с небоскреба',
        abstract: 'Дано M-этажное здание. Если яйцо сбросить с высоты этажа N или больше, оно разобьется. У вас есть два яйца. Найдите N за минимальное количество бросков.',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Задача о 8 ферзях (обобщенная)',
        abstract: 'Расставить максимальное количество взаимно не бьющих друг друга ферзей на прямоугольном поле со сторонами A и B',
        tags: ["Массивы","Шахматы"],
      },
      {
        name: 'Ханойская башня',
        abstract: 'Есть 3 стержня. На первом стержне надета пирамидка из N дисков. Диски можно перекладывать на другой стержень, но на диск нельзя класть другой диск большео размера. Переложите пирамидку на 3 стержень',
        tags: ["Логика","Головоломка"],
      },
      {
        name: 'Проверка на анаграмму',
        abstract: 'Программе подается на вход 2 строки: str1 и str2. Верните true, если str1 является анаграммой str2',
        tags: ["Строки"],
      },
      {
        name: 'Самое большое произведение',
        abstract: 'Дан массив целых чисел. Необходимо найти наибольшее произведение из 3 чисел этого массива',
        tags: ["Логика","Числа"],
      },
    ];

    for (let i = 0; i < challenges.length; i++){
      let c: any = challenges[i];
      c.id = i + 1;
      c.solutionTemplate = defaultSolutionTemplate;
      c.description = defaultDescription;
      c.created = new Date(2017, 1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
      c.rating = Math.random();
      c.difficulty = Math.random();
      c.comments = Math.floor(Math.random() * 100);
      c.views = Math.floor(Math.random() * 200);
      c.solutions = Math.floor(Math.random() * 20);
      c.status = InMemoryDataService.randomItem([
        ChallengeStatus.Completed, ChallengeStatus.InProgress, ChallengeStatus.InProgress,
        ChallengeStatus.NotStarted, ChallengeStatus.NotStarted, ChallengeStatus.NotStarted,
        ChallengeStatus.NotStarted, ChallengeStatus.NotStarted, ChallengeStatus.NotStarted]);
      c.author = InMemoryDataService.randomItem(users).username;
    }

    let playlists = [
      {
        name: 'ТОП 5 задач с рекурсией',
        description: 'Чтобы понять рекурсию, надо понять рекурсию',
        challenges: [
          challenges[1],
          challenges[4],
          challenges[5],
          challenges[6],
        ]
      },
      {
        name: 'Лучшие задачки для новичка',
        description: 'Задачи самые простые, хорошо для тех кто только начал писать программы',
        challenges: [
          challenges[3],
          challenges[7],
          challenges[8],
          challenges[9],
          challenges[10],
        ]
      },
      {
        name: 'Сломай себе мозг!',
        description: '96% населения земли не могут решить эти задачи. А ты?',
        challenges: [
          challenges[11],
          challenges[12],
          challenges[13],
        ]
      },
      {
        name: 'Задачи, которые должен решить каждый!',
        description: 'Самые популярные задачи на собеседованиях',
        challenges: [
          challenges[14],
          challenges[15],
          challenges[16],
        ]
      },
      {
        name: 'просто все задачи',
        description: 'потому что могу',
        challenges: challenges
      }
    ];

    for (let i = 0; i < playlists.length; i++){
      let p: any = playlists[i];
      p.id = i + 1;
      p.created = new Date(2017, 1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
      p.author = InMemoryDataService.randomItem(users).username;
    }

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

    let comments = [
      { text: 'Отличная задача! Решил с удовольствием'},
      { text: 'Сложно. Два дня думала('},
      { text: 'Так и не смог решить...'},
      { text: 'Сначала не поняла, потом додумалась и решила за 2 минуты :)'},
      { text: 'Слишком просто.'},
      { text: 'В школе такую на паскале решал)'},
      { text: 'Интересное решение...'},
      { text: 'Вместо LinkedList лучше использовать ArrayList'},
      { text: 'Похоже на спаггети)'},
      { text: 'Добрый вечер'},
    ];

    for (let i = 0; i< comments.length; i++){
      let c: any = comments[i];
      c.id = i + 1;
      c.challengeId = InMemoryDataService.randomItem(challenges).id;
      c.sharedSolId = Math.random() > 0.3 ? null : InMemoryDataService.randomItem(sharedSolutions).id;
      c.author = InMemoryDataService.randomItem(users).username;
      c.created = new Date(2017, 1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
      c.likes = Math.floor(Math.random() * 30);
    }

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
  }

  static randomItem(items: any[]): any{
    return items[Math.floor(Math.random() * items.length)]
  }
}


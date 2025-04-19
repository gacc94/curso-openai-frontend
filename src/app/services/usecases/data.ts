import { MathSolveProblemsResponse } from '../interfaces';

export const dataMath1: MathSolveProblemsResponse = {
    success: true,
    data: {
        transcripcion: 'f(x) = (6x^2 + x)^2 (x^5 + x^6)^4',
        tipoProblema: 'Cálculo - Derivadas',
        conceptosClave: ['Derivada de producto', 'Regla de la cadena', 'Derivada de potencias', 'Derivada de sumas'],
        solucion: {
            pasos: [
                {
                    numero: 1,
                    descripcion: '✳️ Identificar las funciones que se están multiplicando para aplicar la regla del producto',
                    formula: 'f(x) = u(x) \\, v(x), \\quad u(x) = (6x^2 + x)^2, \\quad v(x) = (x^5 + x^6)^4',
                    explicacion:
                        "La función f(x) es el producto de dos funciones u(x) y v(x), por lo que para derivar f(x) usaremos la regla del producto: f'(x) = u'(x)v(x) + u(x)v'(x).",
                },
                {
                    numero: 2,
                    descripcion: '✳️ Derivar u(x) = (6x^2 + x)^2 usando la regla de la cadena',
                    formula: "u'(x) = 2(6x^2 + x) \\cdot \\frac{d}{dx}(6x^2 + x)",
                    explicacion:
                        'Derivamos la potencia exterior multiplicando por el exponente y dejamos la función interior sin cambiar, luego multiplicamos por la derivada de la función interior.',
                },
                {
                    numero: 3,
                    descripcion: '✳️ Calcular la derivada de la función interior de u(x)',
                    formula: '\\frac{d}{dx}(6x^2 + x) = 12x + 1',
                    explicacion: 'Derivamos término a término: la derivada de 6x^2 es 12x y la derivada de x es 1.',
                },
                {
                    numero: 4,
                    descripcion: "✳️ Sustituir la derivada de la función interior en u'(x)",
                    formula: "u'(x) = 2(6x^2 + x)(12x + 1)",
                    explicacion:
                        'Multiplicamos el factor exterior por la derivada de la función interior para obtener la derivada completa de u(x).',
                },
                {
                    numero: 5,
                    descripcion: '✳️ Derivar v(x) = (x^5 + x^6)^4 usando la regla de la cadena',
                    formula: "v'(x) = 4(x^5 + x^6)^3 \\cdot \\frac{d}{dx}(x^5 + x^6)",
                    explicacion:
                        'Derivamos la potencia exterior multiplicando por el exponente y dejamos la función interior sin cambiar, luego multiplicamos por la derivada de la función interior.',
                },
                {
                    numero: 6,
                    descripcion: '✳️ Calcular la derivada de la función interior de v(x)',
                    formula: '\\frac{d}{dx}(x^5 + x^6) = 5x^4 + 6x^5',
                    explicacion: 'Derivamos término a término: la derivada de x^5 es 5x^4 y la derivada de x^6 es 6x^5.',
                },
                {
                    numero: 7,
                    descripcion: "✳️ Sustituir la derivada de la función interior en v'(x)",
                    formula: "v'(x) = 4(x^5 + x^6)^3 (5x^4 + 6x^5)",
                    explicacion:
                        'Multiplicamos el factor exterior por la derivada de la función interior para obtener la derivada completa de v(x).',
                },
                {
                    numero: 8,
                    descripcion: "✳️ Aplicar la regla del producto para obtener f'(x)",
                    formula:
                        "f'(x) = u'(x)v(x) + u(x)v'(x) = 2(6x^2 + x)(12x + 1)(x^5 + x^6)^4 + (6x^2 + x)^2 4(x^5 + x^6)^3 (5x^4 + 6x^5)",
                    explicacion:
                        'Sumamos el producto de la derivada de la primera función por la segunda función sin derivar, y el producto de la primera función sin derivar por la derivada de la segunda función.',
                },
            ],
            respuestaFinal: "f'(x) = 2(6x^2 + x)(12x + 1)(x^5 + x^6)^4 + 4(6x^2 + x)^2 (x^5 + x^6)^3 (5x^4 + 6x^5)",
            verificacion:
                'Para verificar, se puede evaluar la derivada en un valor específico de x y comparar con la derivada numérica aproximada usando métodos como la diferencia finita. También se puede revisar que cada paso siga correctamente las reglas de derivación.',
        },
        metodosAlternativos:
            "Se podría usar logaritmos para simplificar la derivación: tomar logaritmo natural en ambos lados, derivar implícitamente y luego despejar f'(x). Esto puede simplificar la manipulación algebraica en algunos casos.",
        conceptosRelacionados: [
            'Regla del producto',
            'Regla de la cadena',
            'Derivadas de funciones compuestas',
            'Derivadas de potencias',
            'Funciones polinómicas',
        ],
        nivelDificultad: 'Avanzado',
    },
    originalImage: 'math_problem_1745049994422.png',
    timestamp: new Date('2025-04-19T08:07:01.893Z'),
};

export const dataMath2: MathSolveProblemsResponse = {
    success: true,
    data: {
        transcripcion: '\\frac{36 \\div 3(8-6)}{6}',
        tipoProblema: 'Aritmética (Orden de operaciones)',
        conceptosClave: ['Orden de operaciones', 'Paréntesis', 'División', 'Multiplicación'],
        solucion: {
            pasos: [
                {
                    numero: 1,
                    descripcion: '✳️ Resolver la operación dentro del paréntesis',
                    formula: '8 - 6 = 2',
                    explicacion: 'Primero resolvemos la operación dentro del paréntesis según la jerarquía de operaciones.',
                },
                {
                    numero: 2,
                    descripcion: '✳️ Sustituir el resultado en la expresión original',
                    formula: '\\frac{36 \\div 3 \\times 2}{6}',
                    explicacion: 'Reemplazamos (8-6) por 2.',
                },
                {
                    numero: 3,
                    descripcion:
                        '✳️ Resolver la operación en el numerador siguiendo el orden de operaciones (de izquierda a derecha para división y multiplicación)',
                    formula: '36 \\div 3 = 12 \\rightarrow 12 \\times 2 = 24',
                    explicacion: 'Primero dividimos 36 entre 3 y luego multiplicamos el resultado por 2.',
                },
                {
                    numero: 4,
                    descripcion: '✳️ Escribir la fracción resultante',
                    formula: '\\frac{24}{6}',
                    explicacion: 'El numerador es 24 y el denominador es 6.',
                },
                {
                    numero: 5,
                    descripcion: '✳️ Realizar la división final',
                    formula: '24 \\div 6 = 4',
                    explicacion: 'Dividimos el numerador entre el denominador para obtener el resultado final.',
                },
            ],
            respuestaFinal: 'La respuesta final es \\boxed{4}',
            verificacion:
                'Puedes verificar resolviendo paso a paso y comprobando que cada operación sigue el orden correcto: primero paréntesis, luego división y multiplicación de izquierda a derecha, y finalmente la división de la fracción.',
        },
        metodosAlternativos:
            'Otra forma sería escribir toda la expresión en una sola línea y aplicar PEMDAS/BODMAS cuidadosamente, pero el procedimiento sería el mismo.',
        conceptosRelacionados: ['Jerarquía de operaciones', 'Expresiones algebraicas', 'Fracciones'],
        nivelDificultad: 'Básico',
    },
    originalImage: 'math_problem_1745055995891.jpg',
    timestamp: new Date('2025-04-19T09:47:10.724Z'),
};

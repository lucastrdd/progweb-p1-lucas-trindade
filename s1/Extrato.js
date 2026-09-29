/*
 * 1. Por que é composição e não agregação?
 * É composição porque a existência de Extrato está estritamente atrelada a da Conta.
 * O Extrato é instanciado diretamente dentro da Conta e não faz sentido existir de
 * forma independente sem ela. Se a Conta deixar de existir, o seu Extrato é destruído
 * junto. Na agregação, os objetos existiriam de forma independente e seriam apenas
 * associados.
 *
 * 2. Por que listar() devolve uma cópia?
 * porque assim garantimos o pilar do encapsulamento interno do objeto. Se retornássemos
 * o array original (this.#lancamentos), qualquer pessoa conseguiria alterar os valores
 * pois teria acesso a referência de memória do array (que é privado), podendo alterar
 * o histórico chamando métodos mutáveis como .push() ou .pop(). Quando listar devolve uma
 * cópia ([...this.#lancamentos]), código externo só manipula uma réplica mantendo o array
 * original protegido.
 */

export class Extrato {
    #lancamentos = [];

    registrar(tipo, valor) {
        this.#lancamentos.push({ tipo, valor, data: new Date() });
    }

    listar() {
        return [...this.#lancamentos];
    }
}

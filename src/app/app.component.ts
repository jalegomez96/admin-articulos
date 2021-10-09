import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Article } from './article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'Administración de artículos';
  public tableHeaders = [
    'Código',
    'Descripción',
    'Precio',
    'Borrar',
    'Modificar',
  ];
  public articles: Article[] = [
    new Article(1, 'papas', 10.55),
    new Article(2, 'manzanas', 12.1),
    new Article(3, 'melon', 52.3),
    new Article(4, 'cebollas', 17),
    new Article(5, 'calabaza', 20),
  ];
  public editableArticle = new Article();
  public selectedArticle: Article | null = null;

  addArticle(): void {
    if (!this.editableArticle.isValid()) return this.emptyAlert();
    this.articles.push(this.editableArticle);
    this.editableArticle = new Article();
  }

  editArticle(article: Article): void {
    this.selectedArticle = article;
    Object.assign(this.editableArticle, article);
  }

  async deleteArticle(article: Article) {
    const confirm = await this.confirmAlert(article);
    if (!confirm) return;
    const index = this.articles.indexOf(article);
    if (index > -1) {
      this.articles.splice(index, 1);
    }
  }

  saveArticle(): void {
    if (!this.editableArticle.isValid()) return this.emptyAlert();
    Object.assign(this.selectedArticle, this.editableArticle);
    this.selectedArticle = null;
    this.editableArticle = new Article();
  }

  cancelEditArticle(): void {
    this.selectedArticle = null;
    this.editableArticle = new Article();
  }

  emptyAlert(): void {
    Swal.fire('Error', 'Faltan campos por llenar', 'error');
  }

  async confirmAlert(article: Article) {
    const confirm = await Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar el artículo ${article.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return false;
    Swal.fire('Eliminado!', 'El articulo ha sido eliminado.', 'success');
    return true;
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSubcategoryService from '@modules/subcategories/services/ListSubcategoryService';

export default class SubcategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const listSubcategories = container.resolve(ListSubcategoryService);

    const subcategories = await listSubcategories.execute(category_id);

    return response.json(subcategories);
  }
}

"""empty message

Revision ID: 18466e2ced51
Revises: bccc71e7b054
Create Date: 2023-07-17 14:30:12.157609

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18466e2ced51'
down_revision = 'bccc71e7b054'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('historial_pedidos', schema=None) as batch_op:
        batch_op.alter_column('precioActual',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)

    with op.batch_alter_table('productos', schema=None) as batch_op:
        batch_op.alter_column('precio',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('productos', schema=None) as batch_op:
        batch_op.alter_column('precio',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=False)

    with op.batch_alter_table('historial_pedidos', schema=None) as batch_op:
        batch_op.alter_column('precioActual',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)

    # ### end Alembic commands ###